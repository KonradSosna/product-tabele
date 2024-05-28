import { Box, Input, LinearProgress, SelectChangeEvent } from '@mui/material';
import { SyntheticEvent, useMemo, useState, useTransition } from 'react';
import { productData } from '../utils/getproducts';
import { InputFilter } from './InputFilter';
import { ProductTable } from './Table';
// import { useDebouncedValue } from '../hooks/useDebouncedValue';

export default function ProductTableContainer() {
	const allCategories = useMemo(() => productData.map((cat) => cat.name), []);

	const allSubCategories = useMemo(
		() => [
			...new Set(
				productData
					.map(({ subcategories }) => subcategories.map(({ name }) => name))
					.flat()
			),
		],
		[]
	);

	const [categries, setCategories] = useState<string[]>(allCategories);
	const [subCategries, setSubCategories] = useState(allSubCategories);
	const [filterTerm, setFilterTerm] = useState('');
	const [isPendingCat, startCatTransmision] = useTransition();
	const [isPendingSubcat, startSubcatTransmision] = useTransition();
	const [isPendingProduct, startProductTransmision] = useTransition();

	const handleChangeCat = (event: SelectChangeEvent<typeof categries>) => {
		const {
			target: { value },
		} = event;
		startCatTransmision(() =>
			setCategories(typeof value === 'string' ? value.split(',') : value)
		);
	};

	const handleChangeSubcat = (
		event: SelectChangeEvent<typeof subCategries>
	) => {
		const {
			target: { value },
		} = event;
		startSubcatTransmision(() =>
			setSubCategories(typeof value === 'string' ? value.split(',') : value)
		);
	};

	const useUpdateFilterHandler = (event: SyntheticEvent) => {
		const target = event.target as HTMLTextAreaElement;
		if (target.value.length > 2 || target.value.length === 0)
			startProductTransmision(() => setFilterTerm(target.value));
	};
	// const debouncedTerm = useDebouncedValue(filterTerm);

	return (
		<>
			<div className="bg-white flex flex-col gap-y-4 md:flex-row items-center p-4 gap-x-2">
				<div>
					<Input placeholder="Products" onChange={useUpdateFilterHandler} />
					{isPendingProduct && (
						<Box sx={{ width: '100%' }}>
							<LinearProgress />
						</Box>
					)}
				</div>
				<InputFilter
					allCategories={allCategories}
					categries={categries}
					handleChangeCat={handleChangeCat}
					isPending={isPendingCat}
					label="Categories"
				/>
				<InputFilter
					allCategories={allSubCategories}
					categries={subCategries}
					handleChangeCat={handleChangeSubcat}
					isPending={isPendingSubcat}
					label="Sub Categories"
					disabled={categries.length === 0}
				/>
			</div>
			<h1>Product Table</h1>
			<ProductTable
				categries={categries}
				filterTerm={filterTerm}
				isPendingCat={isPendingCat}
				isPendingSubcat={isPendingSubcat}
				subCategries={subCategries}
			/>
		</>
	);
}

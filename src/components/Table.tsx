import {
	Box,
	CircularProgress,
	LinearProgress,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	TableSortLabel,
} from '@mui/material';
import { productData } from '../utils/getproducts';
import { useState, useTransition } from 'react';

type ProductTableProps = {
	isPendingCat: boolean;
	isPendingSubcat: boolean;
	categries: string[];
	subCategries: string[];
	filterTerm: string;
};

export const ProductTable = ({
	isPendingCat,
	isPendingSubcat,
	categries,
	subCategries,
	filterTerm,
}: ProductTableProps) => {
	const [isPending, startTransmision] = useTransition();
	const [active, setActive] = useState(true);
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

	const handleSort = () => {
		startTransmision(() => {
			if (active === false) {
				setActive(true);
				setSortOrder('asc');
			} else if (sortOrder === 'asc') setSortOrder('desc');
			else if (sortOrder === 'desc') setActive(false);
		});
	};

	return (
		<Paper sx={{ w: 900, p: 2 }}>
			<TableContainer sx={{ height: 500 }}>
				{isPendingCat || isPendingSubcat ? (
					<div className="flex justify-center items-center h-full">
						<CircularProgress style={{ color: 'black' }} />
					</div>
				) : (
					<Table aria-label="table" className="border">
						<TableBody>
							{productData
								.filter((cat) => categries.includes(cat.name))
								.map((cat, index) => {
									return (
										<TableRow key={cat.catId + index}>
											<TableRow key={cat.catId}>
												<TableCell
													align="center"
													className="w-[800px] h-[80px]"
												>
													{cat.name}
												</TableCell>
											</TableRow>
											<TableRow>
												{cat.subcategories
													.filter((subCat) =>
														subCategries.includes(subCat.name)
													)
													.map((subCat) => (
														<TableRow key={subCat.subCatId}>
															<TableRow>
																<TableCell
																	align="center"
																	className="w-[800px] h-[60px]"
																>
																	{subCat.name}
																</TableCell>
															</TableRow>
															<TableRow>
																<TableRow className="border-b-[1px]">
																	<TableCell
																		className="w-[200px]"
																		align="center"
																	>
																		Index
																	</TableCell>
																	<TableCell
																		className="w-[200px]"
																		align="center"
																	>
																		Name
																	</TableCell>
																	<TableCell
																		className="w-[200px]"
																		align="center"
																	>
																		Price
																		<TableSortLabel
																			active={active}
																			direction={sortOrder}
																			onClick={handleSort}
																		/>
																	</TableCell>
																	<TableCell
																		className="w-[200px]"
																		align="center"
																	>
																		Quantity
																	</TableCell>
																</TableRow>
																{subCat.products
																	.filter((item) =>
																		item.name.includes(filterTerm)
																	)
																	.sort((a, b) =>
																		active && sortOrder === 'asc'
																			? a.price - b.price
																			: active && sortOrder === 'desc'
																			? b.price - a.price
																			: 0
																	)
																	.map((product) => (
																		<TableRow key={product.index}>
																			<TableCell
																				align="center"
																				className="flex w-[200px] h-[60px] border-r-2"
																			>
																				{product.index}
																			</TableCell>
																			<TableCell
																				align="center"
																				className="flex w-[200px] h-[60px] border-r-2"
																			>
																				{product.name}
																			</TableCell>
																			<TableCell
																				align="center"
																				className="flex w-[200px] h-[60px] border-r-2"
																			>
																				{product.price}
																			</TableCell>
																			<TableCell
																				align="center"
																				className="flex w-[200px] h-[60px]"
																			>
																				{product.quantity}
																			</TableCell>
																		</TableRow>
																	))}
															</TableRow>
														</TableRow>
													))}
											</TableRow>
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				)}
			</TableContainer>
			{isPending && (
				<Box sx={{ width: '100%' }}>
					<LinearProgress />
				</Box>
			)}
		</Paper>
	);
};

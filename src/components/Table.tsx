import {
	Box,
	CircularProgress,
	LinearProgress,
	Paper,
	Stack,
	Switch,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Typography,
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
	const [checked, setChecked] = useState(true);
	const [isPending, startTransmision] = useTransition();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		startTransmision(() => setChecked(event.target.checked));
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
																	<TableCell align="center">Index</TableCell>
																	<TableCell align="center">Name</TableCell>
																	<TableCell align="center">
																		Price
																		<Stack
																			className="flex items-center justify-center"
																			direction="row"
																			alignItems="center"
																		>
																			<Typography fontSize={10}>Asc</Typography>
																			<Switch
																				checked={checked}
																				onChange={handleChange}
																			/>
																			<Typography fontSize={10}>
																				Desc
																			</Typography>
																		</Stack>
																	</TableCell>
																	<TableCell align="center">Quantity</TableCell>
																</TableRow>
																{subCat.products
																	.filter((item) =>
																		item.name.includes(filterTerm)
																	)
																	.sort((a, b) =>
																		checked
																			? b.price - a.price
																			: a.price - b.price
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

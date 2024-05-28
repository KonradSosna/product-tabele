import {
	CircularProgress,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
} from '@mui/material';
import { productData } from '../utils/getproducts';

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
																{subCat.products
																	.filter((item) =>
																		item.name.includes(filterTerm)
																	)
																	.sort((a, b) => a.price - b.price)
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
		</Paper>
	);
};

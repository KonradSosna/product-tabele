const allCategories = testData.map((cat) => cat.name);
const allSubCategories = testData
	.map((cat) => cat.subcategories.map((subcat) => subcat.name))
	.flat();

const [categries, setCategories] = useState<string[]>(allCategories);
const [subCategries, setSubCategories] = useState<string[]>(allSubCategories);
// const [loading, setLoading] = useState(false);

const handleChange = (event: SelectChangeEvent<typeof categries>) => {
	const {
		target: { value },
	} = event;
	setCategories(typeof value === 'string' ? value.split(',') : value);
};

const handleChange2 = (event: SelectChangeEvent<typeof categries>) => {
	const {
		target: { value },
	} = event;
	setSubCategories(typeof value === 'string' ? value.split(',') : value);
};

return (
	<div className="bg-white">
		<FormControl sx={{ m: 1, width: 300 }}>
			<InputLabel id="demo-multiple-checkbox-label">Categories</InputLabel>
			<Select
				labelId="demo-multiple-checkbox-label"
				id="demo-multiple-checkbox"
				multiple
				value={categries}
				onChange={handleChange}
				input={<OutlinedInput label="Category" />}
				renderValue={(selected) => selected.join(', ')}
				MenuProps={MenuProps}
			>
				{allCategories.map((selectedCategory, index) => (
					<MenuItem key={index} value={selectedCategory}>
						<Checkbox
							defaultChecked={true}
							checked={categries.includes(selectedCategory) ?? true}
						/>
						<ListItemText primary={selectedCategory} />
					</MenuItem>
				))}
			</Select>
		</FormControl>
		<FormControl sx={{ m: 1, width: 300 }}>
			<InputLabel id="demo-multiple-checkbox-label">Sub Categories</InputLabel>
			<Select
				labelId="demo-multiple-checkbox-label"
				id="demo-multiple-checkbox"
				multiple
				value={subCategries}
				onChange={handleChange2}
				input={<OutlinedInput label="Category" />}
				renderValue={(selected) => selected.join(', ')}
				MenuProps={MenuProps}
			>
				{allSubCategories.map((selectedCategory, index) => (
					<MenuItem key={index} value={selectedCategory}>
						<Checkbox
							defaultChecked={true}
							checked={subCategries.includes(selectedCategory) ?? true}
						/>
						<ListItemText primary={selectedCategory} />
					</MenuItem>
				))}
			</Select>
		</FormControl>
	</div>
);

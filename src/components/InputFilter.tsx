import {
	Checkbox,
	FormControl,
	InputLabel,
	ListItemText,
	MenuItem,
	OutlinedInput,
	Select,
	SelectChangeEvent,
} from '@mui/material';

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: 224,
			width: 250,
		},
	},
};

type InputProps = {
	label: string;
	categries: string[];
	handleChangeCat: (v: SelectChangeEvent<string[]>) => void;
	allCategories: string[];
	isPending: boolean;
	disabled?: boolean;
};

export const InputFilter = ({
	label,
	categries,
	handleChangeCat,
	allCategories,
	isPending,
	disabled,
}: InputProps) => {
	return (
		<FormControl sx={{ m: 1, width: 300 }}>
			<InputLabel id="category-filter">{label}</InputLabel>
			<Select
				labelId="category-filter"
				multiple
				value={categries}
				onChange={handleChangeCat}
				disabled={disabled}
				input={<OutlinedInput label={label} />}
				renderValue={(selected) =>
					selected.length === allCategories.length ? 'All' : selected.join(', ')
				}
				MenuProps={MenuProps}
			>
				{allCategories.map((name, index) => (
					<MenuItem key={index} value={name} disabled={isPending}>
						<Checkbox checked={categries.includes(name) ?? true} />
						<ListItemText primary={name} />
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

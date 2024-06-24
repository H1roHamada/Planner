type TypeColor =
	| 'red'
	| 'blue'
	| 'green'
	| 'yellow'
	| 'orange'
	| 'teal'
	| 'navy'
	| 'lime'
	| 'cyan'
	| 'pink'
	| 'purple'
	| 'amber'
	| 'indigo'
	| 'gray';

const getInputClassNamesByColor = (color: TypeColor | undefined) => {
	switch (color) {
		case 'red':
			return 'checked:border-none checked:bg-red-500 dark:checked:bg-red-400';

		case 'blue':
			return 'checked:border-none checked:bg-blue-500 dark:checked:bg-blue-400';

		case 'green':
			return 'checked:border-none checked:bg-green-500 dark:checked:bg-green-400';

		case 'yellow':
			return 'checked:border-none checked:bg-yellow-500 dark:checked:bg-yellow-400';

		case 'orange':
			return 'checked:border-none checked:bg-orange-500 dark:checked:bg-orange-400';

		case 'teal':
			return 'checked:border-none checked:bg-teal-500 dark:checked:bg-teal-400';

		case 'navy':
			return 'checked:border-none checked:bg-navy-500 dark:checked:bg-navy-400';

		case 'lime':
			return 'checked:border-none checked:bg-lime-500 dark:checked:bg-lime-400';

		case 'cyan':
			return 'checked:border-none checked:bg-cyan-500 dark:checked:bg-cyan-400';

		case 'pink':
			return 'checked:border-none checked:bg-pink-500 dark:checked:bg-pink-400';

		case 'purple':
			return 'checked:border-none checked:bg-purple-500 dark:checked:bg-purple-400';

		case 'amber':
			return 'checked:border-none checked:bg-amber-500 dark:checked:bg-amber-400';

		case 'indigo':
			return 'checked:border-none checked:bg-indigo-500 dark:checked:bg-indigo-400';

		case 'gray':
			return 'checked:border-none checked:bg-gray-500 dark:checked:bg-gray-400';

		default:
			return 'checked:border-none checked:bg-brand-400 dark:checked:bg-brand-400';
	}
};

const Checkbox = (props: {
	id?: string;
	extra?: string;
	color?: TypeColor;
	[x: string]: any;
}) => {
	const { extra, color, id, ...rest } = props;
	return (
		<input
			id={id}
			name='weekly'
			type='checkbox'
			className={`defaultCheckbox relative inline-flex h-[20px] min-h-[20px] w-[20px] min-w-[20px] appearance-none items-center
      justify-center rounded-md border border-gray-300 text-white/0 outline-none transition ease-linear
      checked:border-none checked:text-white hover:cursor-pointer dark:border-white/10 ${getInputClassNamesByColor(
				color
			)} ${extra}`}
			{...rest}
		/>
	);
};

export default Checkbox;

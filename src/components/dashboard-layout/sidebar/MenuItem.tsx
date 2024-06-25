import Link from 'next/link';

import { IMenuItem } from './menu.interface';

export function MenuItem({
	item,
	collapsed
}: {
	item: IMenuItem;
	collapsed: boolean;
}) {
	return (
		<div>
			<Link
				href={item.link}
				className='flex gap-2.5 items-center py-1.5 mt-2 px-layout transition-colors hover:bg-border rounded-lg'
				style={{
					justifyContent: collapsed ? 'center' : ''
				}}
			>
				<item.icon
					style={{
						minWidth: '24px'
					}}
				/>

				{!collapsed && <span>{item.name}</span>}
			</Link>
		</div>
	);
}

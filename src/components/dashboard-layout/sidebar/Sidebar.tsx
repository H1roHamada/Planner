'use client';

import { Button } from 'antd';
import { ChevronLeft, ChevronRight, GanttChartSquare } from 'lucide-react';
import Link from 'next/link';

import { MenuItem } from './MenuItem';
import { MENU } from './menu.data';
import { COLORS } from '@/shared/constants/color.constants';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';

export function Sidebar() {
	const [dashboardCollapsed, setDashboardCollapsed] = useLocalStorage<boolean>({
		key: 'dashboardCollapsed',
		defaultValue: false
	});

	return (
		<aside
			className='border-r border-r-border h-full bg-sidebar flex flex-col justify-between'
			style={{
				width: dashboardCollapsed ? '70px' : '250px'
			}}
		>
			<div
				style={{
					height: '100%',
					display: 'flex',
					flexDirection: 'column'
				}}
			>
				<Link
					href='/lk'
					className='flex items-center gap-2.5 p-layout border-b border-b-border'
					style={{
						justifyContent: dashboardCollapsed ? 'center' : ''
					}}
				>
					<GanttChartSquare
						color={COLORS.primary}
						size={38}
						style={{
							minWidth: '38px'
						}}
					/>

					{!dashboardCollapsed && (
						<span className='text-2xl font-bold relative'>
							Planner
							<span className='absolute -top-1 -right-6 text-xs opacity-40 rotate-[18deg] font-normal'>
								beta
							</span>
						</span>
					)}
				</Link>
				<div className='p-3 relative'>
					{MENU.map(item => (
						<MenuItem
							item={item}
							key={item.link}
							collapsed={dashboardCollapsed}
						/>
					))}
				</div>

				<Button
					type='primary'
					icon={dashboardCollapsed ? <ChevronRight /> : <ChevronLeft />}
					style={{
						width: '100%',
						borderRadius: 0,
						marginTop: 'auto'
					}}
					onClick={() => setDashboardCollapsed(prev => !prev)}
				/>
			</div>
		</aside>
	);
}

import { NextRequest, NextResponse } from 'next/server';

import { DASHBOARD_PAGES } from './config/pages-url.config';
import { EnumTokens } from './shared/enum/tokens.enum';

export const config = {
	matcher: ['/lk/:path*', '/auth/:path']
};

export async function middleware(request: NextRequest, response: NextResponse) {
	const { url, cookies } = request;

	const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value;

	// const isDashboardPage = url.includes('/lk');
	const isAuthPage = url.includes('/auth');

	// if (isDashboardPage && !refreshToken) {
	// 	return NextResponse.redirect(new URL('/404', url));
	// }

	if (isAuthPage && refreshToken) {
		return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, url));
	}

	if (isAuthPage) {
		return NextResponse.next();
	}

	if (!refreshToken) {
		return NextResponse.redirect(new URL('/auth', request.url));
	}

	return;
}

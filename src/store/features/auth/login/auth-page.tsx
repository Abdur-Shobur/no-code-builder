import { image } from '@/assets/images';
import { Button } from 'antd';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { BackNavigation } from '../_ctx';
export function AuthPage() {
	const { theme } = useTheme();
	return (
		<div className="h-screen flex justify-center items-center p-4 ">
			<div className="border p-4 rounded-lg max-w-lg w-full mx-auto  relative group">
				<BackNavigation />

				<div>
					<Image
						className="mx-auto h-10 w-auto"
						src={theme === 'dark' ? image.whiteLogo : image.darkLogo}
						alt="Your Company"
					/>
					<h2 className="mt-2 text-center text-2xl/9 font-bold tracking-tight   ">
						Sign in to your account
					</h2>
				</div>
				<div className="mt-8 flex flex-col gap-4">
					<Link className="w-full" href={`/auth?in_page=login`}>
						<Button className="w-full" type="primary" size="large">
							Login
						</Button>
					</Link>
					<Link className="w-full" href={`/auth?in_page=signup`}>
						<Button className="w-full" type="default" size="large">
							Sign Up
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}

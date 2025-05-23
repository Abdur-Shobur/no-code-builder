import { Button } from 'antd';
import Link from 'next/link';
import { BackNavigation } from '../_ctx';
export function SignUP() {
	return (
		<div className="h-screen flex justify-center items-center p-4 ">
			<div className="border p-8 rounded-lg max-w-lg w-full mx-auto relative group">
				<div className="flex gap-4 ">
					<Link
						className="flex-1"
						href={`/auth?in_page=parent_signup&from=parent_signup`}
					>
						<Button className="flex-1 w-full !h-20" type="dashed">
							Parent
						</Button>
					</Link>
					<Link
						className="flex-1"
						href={`/auth?in_page=child_signup&from=child_signup`}
					>
						<Button className="flex-1 w-full !h-20" type="dashed">
							Child
						</Button>
					</Link>
				</div>
				<BackNavigation />
			</div>
		</div>
	);
}

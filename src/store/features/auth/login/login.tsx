import { Button } from 'antd';
import Link from 'next/link';
import { BackNavigation } from '../_ctx';
export function Login() {
	return (
		<div className="h-screen flex justify-center items-center p-4 ">
			<div className="border p-8 rounded-lg max-w-lg w-full mx-auto relative group">
				<div className="flex gap-4 ">
					<Link
						className="flex-1"
						href={`/auth?in_page=parent&from=parent_login`}
					>
						<Button className="flex-1 w-full !h-20" type="dashed">
							Parent
						</Button>
					</Link>
					<Link
						className="flex-1"
						href={`/auth?in_page=child&from=child_login`}
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

export type ResponseType<T> = {
	status: boolean;
	message: string;
	data: T;
	statusCode: number;
};

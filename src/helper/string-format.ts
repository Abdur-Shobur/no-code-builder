// Example usage:
// console.log(stringFormat('  some permission key  '));
// // "some_permission_key"

export function stringFormat(str: string): string {
	return str.trim().replace(/\s+/g, '_').toLocaleLowerCase();
}

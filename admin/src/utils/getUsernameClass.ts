export function getUsernameClassByRole(role: string) {

    if (role === 'ADMIN') {
        return 'text-red-500';
    } else if (role === 'CZ_MEMBER') {
        return 'text-blue-500';
    } else {
        return 'text-gray-600';

    }
}

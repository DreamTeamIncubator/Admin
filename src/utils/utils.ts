export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
};

export function formatPostDate(isoDate) {
    const date = new Date(isoDate);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);

    if (diffSec < 60) return 'just now';
    if (diffMin < 60) return `${diffMin} minutes ago`;
    if (diffHour < 24) return `${diffHour} hours ago`;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
        return `yesterday at ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    }

    const options = { day: '2-digit', month: '2-digit' };
    const time = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    if (now.getFullYear() === date.getFullYear()) {
        return `${date.toLocaleDateString('en-GB', options)} at ${time}`;
    }

    return `${date.toLocaleDateString('en-GB')}`;
}


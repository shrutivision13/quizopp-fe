export function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
}

// Foremat tim

export const formattedTime = (endTime) => {
    const date = new Date(endTime * 1000); // Multiply by 1000 to convert seconds to milliseconds

    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
}
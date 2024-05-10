export const transformCategories = (data) => {
    return data.reduce((acc, item) => {
        if (!item.parentId) {
            // Nếu không có parentId, đây là một mục gốc
            acc.push({
                id: item.id,
                parentId: item.parentId,
                slugParent: item.slug,
                name: item.name,
                sub: []
            });
        } else {
            // Nếu có parentId, thêm vào mục con của mục có parentId tương ứng
            const parent = acc.find(parentItem => parentItem.id === item.parentId);
            if (parent) {
                parent.sub.push({
                    id: item.id,
                    name: item.name,
                    attributes: item.attributes,
                    slug: item.slug
                });
            }
        }
        return acc;
    }, []);
};

export const formatterMonney = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
})

export const generateRange = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
}

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    return formattedDate;
}

export const formatDateAndTime = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month} - ${hours}:${minutes}`;
};

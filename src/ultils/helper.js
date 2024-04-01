export const transformCategories = (data) => {
    return data.reduce((acc, item) => {
        if (!item.parentId) {
            // Nếu không có parentId, đây là một mục gốc
            acc.push({
                id: item.id,
                parentId: item.parentId,
                slugParent:item.slug,
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
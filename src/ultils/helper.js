export const transformCategories = (data) => {
    return data.map(item => ({
        id: item.id,
        parentId: item.parentId,
        slugParent: item.slug,
        name: item.name,
        sub: item.subCategories.map(subItem => ({
            id: subItem.id,
            name: subItem.name,
            attributes: subItem.attributes,
            slug: subItem.slug
        }))
    }));
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

export function validateVietnamesePhoneNumber(phoneNumber) {
    const vietnamesePhoneRegex = /^(0|84)(9\d|1[2|6|8|9])(\d{7}|\d{8})$/;
    const vietnamesePhonePrefixes = {
        "Vinaphone": ["091", "094", "088", "083", "084", "085", "081", "082"],
        "Viettel": ["086", "096", "097", "098", "032", "033", "034", "035", "036", "037", "038", "039"],
        "Mobilephone": ["089", "090", "093", "070", "079", "077", "076", "078"],
        "Mạng ảo": ["087", "055", "077", "089"]
    };

    if (!vietnamesePhoneRegex.test(phoneNumber)) {
        return false; // Kiểm tra định dạng số điện thoại
    }

    const prefix = phoneNumber.substring(0, 3);
    for (const network in vietnamesePhonePrefixes) {
        if (vietnamesePhonePrefixes[network].includes(prefix)) {
            return true; // Số điện thoại hợp lệ và thuộc mạng này
        }
    }

    return false; // Số điện thoại hợp lệ nhưng không thuộc mạng nào được liệt kê
}
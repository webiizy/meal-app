import messageReducer from './message';
export const mainReducer = ({ message }, action) => ({
    message: messageReducer(message, action),
});
export const initialState = {
    message: [
        {
            name: "COMBO LAU TẨY ĐA NĂNG",
            image: {
                title: 'combo Lau tẩy đa năng.jpg'
                , url: "https://firebasestorage.googleapis.com/v0/b/fir-member-89e59.appspot.com/o/images%2Fpromo%2Fcombo%20Lau%20t%E1%BA%A9y%20%C4%91a%20n%C4%83ng.jpg?alt=media&token=bf8f763c-0c37-432a-86da-443b3bce8596"
            },
            desc: `- Nước lau sàn Sunlight hương hoa thiên nhiên và kem tẩy đa năng CIF" Siêu sạch - siêu sáng "`,
            type: "promo",
            created_at: new Date()
        },
        {
            name: 'Layout',
            desc: 'Payment screen, Profile screen Ongoing',
            icon: "bell-circle",
            seen: false,
            type: "notification",
            created_at: new Date()
        },
        {
            name: "Combo Bảo vệ khỏi vi khuẩn",
            image: {
                title: '4 - combo Bao ve khoi vi khuan.jpg'
                , url: "https://firebasestorage.googleapis.com/v0/b/fir-member-89e59.appspot.com/o/images%2Fpromo%2F4%20-%20combo%20Bao%20ve%20khoi%20vi%20khuan.jpg?alt=media&token=34cf2a9f-102a-43e4-b5a3-aaaee7cdbd26"
            },
            desc: `- Nướclau sàn và nước rửa tay`,
            type: "promo",
            created_at: new Date()
        },
        {
            name: 'Sign In Task',
            desc: 'Google, Facebook and Classic signin completed',
            icon: "bell-circle",
            seen: true,
            type: "notification",
            created_at: "2020-04-16"
        },
        {
            name: 'Navigation',
            desc: 'Side menu and bottom menu completed',
            icon: "bell-circle",
            seen: true,
            type: "notification",
            created_at: "2020-04-16"
        },
        {

            name: "Combo OMO + Comfort + Dầu xả tóc Sunsilk óng mượt",
            image: {
                title: '1-combo GIAT-XA.jpg'
                , url: "https://firebasestorage.googleapis.com/v0/b/fir-member-89e59.appspot.com/o/images%2Fpromo%2F1-combo%20GIAT-XA.jpg?alt=media&token=2181c0a5-f17b-4fa3-9962-3853815cc183"
            },
            desc: `- Combo sẽ giúp các bà nội trợ trở thành người phụ nữ hoàn hảo trong việc giặt xả.\n- Giá siêu sốc, tiết kiệm lên đến 40k/ combo`,
            type: "promo",
            created_at: "2020-04-10"
        },
        {
            name: "Combo Mật Ong và Tinh nghệ",
            image: {
                title: 'combo Nghệ mật ong.jpg'
                , url: "https://firebasestorage.googleapis.com/v0/b/fir-member-89e59.appspot.com/o/images%2Fpromo%2Fcombo%20Ngh%E1%BB%87%20m%E1%BA%ADt%20ong.jpg?alt=media&token=2cc9809c-44aa-4774-9e3f-53afa6a71057"
            },
            desc: `- Mật ong hoa cà phê được chọn lọc từ vùng cao nguyên Việt Nam. hoa cà phê mang lại hương thơm tinh tế, vị ngon rất riêng cho mật ong này\n- Cam kết 100% mật ong nguyên chất`,
            type: "promo",
            created_at: "2020-04-10"
        },
        {
            name: 'Momo',
            desc: 'Testing payment completed',
            icon: "bell-circle",
            seen: true,
            type: "notification",
            created_at: "2020-04-01"
        },
    ],
}
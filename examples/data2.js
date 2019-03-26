const { File } = require('../lib');
module.exports = {
    __relationships: {
        meetings: {
            meetingroom_id: 'meetingrooms'
        },
        meeting_users: {
            meeting_id: 'meetings',
            user_id: 'users'
        },
        orgs: {
            parentOrg_id: ['orgs', 'subOrgs']
        },
        users: {
            org_id: 'orgs'
        }
    },
    meetingrooms: [
        //会议室
        { id: -1 },
        {
            id: 1,
            room_name: '会议室名字_demo',
            area: '区域_demo',
            capacity: '容量_demo',
            room_address: '地址_demo',
            facility: ['0', '1', '2'], //会议设备 0.扩音 1.显示 2.白板 3.视频
            photos: [''], //相片
            status: true //状态  true:正常  false:停用
        },
        {
            id: 2,
            room_name: '会议室名字_demo2',
            area: '区域_demo2',
            capacity: '容量_demo2',
            room_address: '地址_demo2',
            facility: ['0', '1'], //会议设备 0.扩音 1.显示 2.白板 3.视频
            photos: [], //相片
            status: false //状态  true:正常  false:停用
        },
        {
            id: 3,
            room_name: '会议室名字_demo3',
            area: '区域_demo23',
            capacity: '容量_demo3',
            room_address: '地址_demo3',
            facility: ['0', '1'], //会议设备 0.扩音 1.显示 2.白板 3.视频
            photos: [], //相片
            status: false //状态  true:正常  false:停用
        },
        {
            id: 4,
            room_name: '会议室名字_demo4',
            area: '区域_demo4',
            capacity: '容量_demo4',
            room_address: '地址_demo4',
            facility: ['0'], //会议设备 0.扩音 1.显示 2.白板 3.视频
            photos: [], //相片
            status: false //状态  true:正常  false:停用
        }
    ],

    meetings: [
        //会议
        { id: -1 },
        {
            id: 1,
            meeting_title: '会议主题1',
            meeting_time: new Date('2017-02-11T02:32:17.623Z'),
            meeting_type: 0,
            meetingroom_id: 1, //关联
            organizer: '组织者',
            sponsor: '主办单位',
            meeting_content: '会议内容1',
            notifi: [''], //通知   0微信 1邮件,
            warn: [''], //提醒 0.准时 1.提前15分钟 2.提前1小时 3.提前2小时 4.提前1天
            meeting_status: '0',
            attachment: new File('1', '会议详情', 'http://somedomain.com/detail.pdf', '', 'application/pdf'),
            attachments: [new File('1', '会议详情', 'http://somedomain.com/detail.pdf', '', 'application/pdf')]
        },
        {
            id: 2,
            meeting_title: '会议主题2',
            meeting_type: 0,
            meetingroom_id: 2, //关联
            organizer: 'smallPay',
            sponsor: 'infohold',
            meeting_content: '会议内容2',
            notifi: [], //通知   0微信 1邮件,
            warn: [], //提醒 0.准时 1.提前15分钟 2.提前1小时 3.提前2小时 4.提前1天
            meeting_status: '1'
        },
        {
            id: 3,
            meeting_title: '会议主题3',
            meeting_type: 0,
            meetingroom_id: 3, //关联
            organizer: 'smallPay',
            sponsor: 'infohold',
            meeting_content: '会议内容3',
            notifi: [], //通知   0微信 1邮件,
            warn: [], //提醒 0.准时 1.提前15分钟 2.提前1小时 3.提前2小时 4.提前1天
            meeting_status: '2'
        },
        {
            id: 4,
            meeting_title: '会议主题4',
            meeting_type: 0,
            meetingroom_id: 4, //关联
            organizer: 'smallPay',
            sponsor: 'infohold',
            meeting_content: '会议内容4',
            notifi: [], //通知   0微信 1邮件,
            warn: [], //提醒 0.准时 1.提前15分钟 2.提前1小时 3.提前2小时 4.提前1天
            meeting_status: '3'
        }
    ],

    meeting_users: [
        { id: -1 },
        { id: 1, meeting_id: 1, user_id: 1 },
        { id: 2, meeting_id: 1, user_id: 2 },
        { id: 3, meeting_id: 1, user_id: 3 },
        { id: 4, meeting_id: 1, user_id: 4 },
        { id: 5, meeting_id: 1, user_id: 5 },
        { id: 6, meeting_id: 2, user_id: 1 },
        { id: 7, meeting_id: 2, user_id: 2 },
        { id: 8, meeting_id: 2, user_id: 3 },
        { id: 9, meeting_id: 2, user_id: 4 },
        { id: 10, meeting_id: 2, user_id: 5 },
        { id: 11, meeting_id: 3, user_id: 1 },
        { id: 12, meeting_id: 3, user_id: 2 },
        { id: 13, meeting_id: 3, user_id: 3 },
        { id: 14, meeting_id: 3, user_id: 4 },
        { id: 15, meeting_id: 3, user_id: 5 },
        { id: 16, meeting_id: 4, user_id: 5 }
    ],

    orgs: [
        { id: -1 },
        { id: 1, org_name: '小付钱包' },
        { id: 2, org_name: '企业中心', parentOrg_id: 1 },
        { id: 3, org_name: '微服务组', parentOrg_id: 2 },
        { id: 4, org_name: '测试组', parentOrg_id: 2 },
        { id: 5, org_name: '项目组', parentOrg_id: 2 },
        { id: 6, org_name: 'SDK组', parentOrg_id: 2 },
        { id: 7, org_name: '前端组', parentOrg_id: 2 }
    ],

    users: [
        { id: -1 },
        { id: 1, name: '张三', org_id: 1 },
        { id: 2, name: '张四', org_id: 1 },
        { id: 3, name: '张五', org_id: 1 },
        { id: 4, name: '张六', org_id: 1 },
        { id: 5, name: '张七', org_id: 1 }
    ]
};

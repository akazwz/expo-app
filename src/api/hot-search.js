const axios = require('axios');
const baseUrl = 'https://hs.hellozwz.com';

// 根据日期区间获取热搜
const GetHotSearchesByDuration = (start, stop) => {
    return axios.get(baseUrl + "/hot-searches", {
        params: {
            start: start,
            stop: stop
        },
    });
};

// 根据内容获取热搜
const GetHotSearchesByContent = (content, start, stop) => {
    return axios.get(baseUrl + "/hot-searches/content/" + content, {
        params: {
            start: start,
            stop: stop
        },
    });
};

export {GetHotSearchesByDuration, GetHotSearchesByContent};

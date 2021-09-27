const axios = require('axios');
const baseUrl = 'https://hs.hellozwz.com';

// 获取当前热搜
const GetCurrentHotSearch = () => {
    return axios.get(baseUrl + "/hot-searches/current");
};

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

export { GetCurrentHotSearch, GetHotSearchesByDuration, GetHotSearchesByContent };

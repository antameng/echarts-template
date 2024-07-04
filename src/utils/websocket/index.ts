const DEFAULT_OPTIONS = {
    url: '', // websocket url
    heartBeatDate: '', // 你的心跳数据
    heartBeatInterval: 60 * 1000, // 心跳间隔 , 单位毫秒
    reconnectInterval: 5 * 1000, // 重连间隔, 单位毫秒
    maxReconnectTimes: 5, // 重连最大次数
}

export default function useWebSocket(options: DEFAULT_OPTIONS = {}) {
    const state = {
        options: { ...DEFAULT_OPTIONS }
    }


}

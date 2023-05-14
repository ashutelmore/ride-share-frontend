import React from 'react'
import {
    Spin
} from 'antd'
import { Loading3QuartersOutlined } from '@ant-design/icons';


function Loader() {
    return (
        <>
            <p className="flex w-full h-screen bg-[#0000000f] items-center justify-center xs:flex-col fixed top-4 left-0 z-50">
                <Spin
                    indicator={<Loading3QuartersOutlined style={{ fontSize: 54 }} spin />}
                    size="large" />
            </p>
        </>
    )
}
export const LoaderSmall = () => {
    return (
        <>
            <p className="flex w-full h-screen bg-[#0000000f] items-center justify-center xs:flex-col top-4 rounded-md">
                <Spin
                    indicator={<Loading3QuartersOutlined style={{ fontSize: 54 }} spin />}
                    size="large" />
            </p>
        </>
    )
}


export default Loader
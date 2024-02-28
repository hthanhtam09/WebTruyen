import React from 'react';
import { Tooltip, Typography } from '@material-tailwind/react';

export function IconLabels(label: string) {
    switch (label) {
        case 'full':
            return (
                <Tooltip
                    className="border border-blue-gray-50 bg-white px-4 py-2 shadow-xl shadow-black/10 z-[99999]"
                    content={<Typography color="black">Đã có <span className="font-bold">Full</span> chương</Typography>}
                >
                    <img src="/images/full.png" alt="Full Icon" className="w-12 h-12" />
                </Tooltip>
            );
        case 'hot':
            return (
                <Tooltip
                    className="border border-blue-gray-50 bg-white px-4 py-2 shadow-xl shadow-black/10 z-[99999]"
                    content={<Typography color="black">Đang <span className="font-bold">Hot</span></Typography>}
                >
                    <img src="/images/fire.png" alt="Hot Icon" className="w-11 h-11" />
                </Tooltip>
            );
        case 'new':
            return (
                <Tooltip
                    className="border border-blue-gray-50 bg-white px-4 py-2 shadow-xl shadow-black/10 z-[99999]"
                    content={<Typography color="black">Truyện <span className="font-bold">Mới</span></Typography>}
                >
                    <img src="/images/star.png" alt="New Icon" className="w-12 h-12" />
                </Tooltip>
            );
        default:
            return null;
    }
}

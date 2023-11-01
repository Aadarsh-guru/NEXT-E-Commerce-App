'use client'
import DashboardSlidesCarosal from '@/components/carosal/DashboardSlidesCarosal';
import uploadToS3 from '@/helpers/UploadToS3';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { MdUpload } from 'react-icons/md';

const SettingsConntainer = () => {

    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(false);
    const [uploadData, setUploadData] = useState({ image: '', url: '' })

    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            if (!uploadData.image || !uploadData.image?.type.includes('image')) {
                return toast.error('Please select an image.')
            }
            setLoading(true);
            const { success, key } = await uploadToS3(uploadData.image, `slides`);
            if (!success) {
                return toast.error('something went wrong.');
            }
            const response = await axios.post(`/api/slide`, { url: uploadData.url, image: key })
            setLoading(false);
            if (response.data?.success) {
                toast.success(response.data?.message)
                setUploadData({ image: '', url: '' })
                queryClient.invalidateQueries(['slides'])
            } else {
                toast.error(response.data?.message)
                setUploadData({ image: '', url: '' })
            }
        } catch (error) {
            setLoading(false);
            toast.error('something went wrong.')
            console.log(error);
        }
    }

    const { data, isLoading } = useQuery(['slides'], async () => {
        const response = await axios.get(`/api/slide`)
        return response.data?.slides
    }, {
        staleTime: Infinity
    })

    return (
        <div className="w-full min-h-[calc(100vh-60px)] flex flex-col items-center p-4">
            <div className="w-full max-w-[600px] mx-auto my-8 p-6 border rounded-lg shadow-lg bg-white">
                <h1 className="text-xl text-black/75 font-semibold mb-6 text-center">Upload Slides</h1>
                <form onSubmit={handleUpload}>
                    <div className="mb-6">
                        <input
                            type="text"
                            id="url"
                            value={uploadData.url}
                            required
                            onChange={(e) => setUploadData({ ...uploadData, url: e.target.value })}
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full text-lg"
                            placeholder="Enter URL"
                        />
                    </div>
                    <div className="mb-6 flex gap-2 w-full">
                        <input
                            type="file"
                            id="image"
                            onChange={(e) => setUploadData({ ...uploadData, image: e.target.files[0] })}
                            className="hidden"
                        />
                        <label
                            htmlFor="image"
                            className="cursor-pointer border border-gray-300 rounded-lg px-3 py-2 w-1/3 bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 text-lg text-center active:scale-95 flex justify-center items-center gap-1"
                        >
                            <MdUpload className='text-2xl' />
                            Select Slide
                        </label>
                        <input
                            type="text"
                            disabled
                            className="border border-gray-300 rounded-lg px-3 py-2 w-2/3 text-lg text-black/50"
                            value={uploadData.image ? uploadData.image.name : "No Slide Selected"}
                        />
                    </div>
                    <button
                        disabled={loading}
                        type="submit"
                        className="bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-200 text-lg w-full active:scale-[99%] disabled:cursor-not-allowed disabled:bg-blue-400"

                    >
                        {
                            loading ?
                                (
                                    <>  <div className="inline-block w-4 h-4 border-t-2 border-r-2 border-b-2 border-white rounded-full animate-spin mt-1"></div> {'Uploading..'}</>
                                )
                                :
                                'Upload Slide'
                        }
                    </button>
                </form>
            </div>
            <div className="w-full h-full">
                <DashboardSlidesCarosal slides={data} isLoading={isLoading} />
            </div>
        </div>
    )
}

export default SettingsConntainer
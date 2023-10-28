import {
    Dialog,
    Transition
} from '@headlessui/react';
import {
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    TelegramShareButton,
    FacebookShareButton,
} from 'react-share';
import {
    BsTwitter,
    BsWhatsapp,
    BsLinkedin,
    BsTelegram,
    BsLink45Deg,
    BsFacebook
} from 'react-icons/bs';
import {
    Fragment,
    useEffect,
    useState
} from 'react';

const ShareModel = ({ isOpen, setIsOpen, title }) => {

    const [isCopied, setIsCopied] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setLinkUrl(window.location.href);
        }
    }, []);

    const copyToClipboard = () => {
        navigator.clipboard
            .writeText(linkUrl)
            .then(() => setIsCopied(true))
            .catch((error) => console.error('Copy to clipboard failed: ', error));
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog open={isOpen} as="div" className="relative z-10" onClose={() => setIsOpen(!isOpen)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                    Share Product
                                </Dialog.Title>
                                <div className="mt-6 flex justify-evenly items-center space-x-4">
                                    <TwitterShareButton title={title} url={linkUrl} windowWidth={660} windowHeight={460}>
                                        <BsTwitter className="text-3xl text-blue-400 hover:text-blue-600 cursor-pointer" />
                                    </TwitterShareButton>
                                    <WhatsappShareButton title={title} url={linkUrl} windowWidth={660} windowHeight={460}>
                                        <BsWhatsapp className="text-3xl text-green-500 hover:text-green-600 cursor-pointer" />
                                    </WhatsappShareButton>
                                    <LinkedinShareButton title={title} url={linkUrl} windowWidth={660} windowHeight={460}>
                                        <BsLinkedin className="text-3xl text-blue-600 hover:text-blue-800 cursor-pointer" />
                                    </LinkedinShareButton>
                                    <TelegramShareButton title={title} url={linkUrl} windowWidth={660} windowHeight={460}>
                                        <BsTelegram className="text-3xl text-blue-400 hover:text-blue-600 cursor-pointer" />
                                    </TelegramShareButton>
                                    <FacebookShareButton title={title} url={linkUrl} windowWidth={660} windowHeight={460}>
                                        <BsFacebook className="text-3xl text-blue-600 hover:text-blue-800 cursor-pointer" />
                                    </FacebookShareButton>
                                </div>
                                <div className="mt-4 flex justify-center">
                                    <button
                                        type="button"
                                        onClick={copyToClipboard}
                                        className="w-full inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 border rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-blue-200"
                                    >
                                        {isCopied ? (
                                            <>
                                                <span>Copied!</span>
                                                <BsLink45Deg className="text-blue-500" />
                                            </>
                                        ) : (
                                            <>
                                                <span>Copy Link</span>
                                                <BsLink45Deg className="text-gray-400" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ShareModel;

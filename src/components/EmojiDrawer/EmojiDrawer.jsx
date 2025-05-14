import React from 'react'
import coins from '../../assets/images/coin.png'
import launghingEmoji from '../../assets/images/joy-face.webp'
import crying from '../../assets/images/crying.webp'
import nerdFace from '../../assets/images/nerd-face.webp'
import angryFace from '../../assets/images/angry.webp'
import punch from '../../assets/images/punch.webp'
import shocked from '../../assets/images/shocked.webp'
import CloseIcon from '../Icons/CloseIcon'

const EmojiDrawer = ({ setOpenEmojiDrawer, openEmojiDrawer }) => {
    return (
        <div className={`absolute bottom-0 animate__animated bottomsheet_animated w-full max-w-maxW text-14 text-CFAFAFA mx-auto rounded-t-10 text-center py-20 transition-opacity h-min-360 bg-C20213F border-C404380 border-1 z-100 ${openEmojiDrawer ? 'animate__slideInUp' : 'animate__slideOutDown'}`}>
            <div data-testid="lifeline-close-sheet-button" className="text-CFFFFFF flex flex-row-reverse cursor-pointer absolute top-15 right-15" onClick={() => setOpenEmojiDrawer(false)}>
                <CloseIcon />
            </div>
            <div className="border-b-1 border-b-C404380 w-full max-w-maxW pb-20 mb-14">SEND A FUN REACTION</div>
            <div class="mx-20 flex items-center justify-evenly">
                <div class="cursor-pointer">
                    <div class="relative">
                        <img alt="emoji" loading="lazy" width="36" height="36" decoding="async" src={launghingEmoji} />
                        <div class="inset-0"></div>
                    </div>
                    <div class="text-10 text-CFFFFFF flex items-center justify-center">
                        <div class="flex items-center justify-center">
                            <img alt="coins" loading="lazy" width="17" height="15" decoding="async" src={coins} />
                            10
                        </div>
                    </div>
                </div>

                <div class="cursor-pointer">
                    <div class="relative">
                        <img alt="emoji" loading="lazy" width="36" height="36" decoding="async" src={crying} />
                        <div class="inset-0"></div>
                    </div>
                    <div class="text-10 text-CFFFFFF flex items-center justify-center">
                        <div class="flex items-center justify-center">
                            <img alt="coins" loading="lazy" width="17" height="15" decoding="async" src={coins} />
                            10
                        </div>
                    </div>
                </div>

                <div class="cursor-pointer">
                    <div class="relative">
                        <img alt="emoji" loading="lazy" width="36" height="36" decoding="async" src={nerdFace} />
                        <div class="inset-0"></div>
                    </div>
                    <div class="text-10 text-CFFFFFF flex items-center justify-center">
                        <div class="flex items-center justify-center">
                            <img alt="coins" loading="lazy" width="17" height="15" decoding="async" src={coins} />
                            10
                        </div>
                    </div>
                </div>
                <div class="cursor-pointer">
                    <div class="relative">
                        <img alt="emoji" loading="lazy" width="36" height="36" decoding="async" src={punch} />
                        <div class="inset-0"></div>
                    </div>
                </div>
                <div class="cursor-pointer">
                    <div class="relative">
                        <img alt="emoji" loading="lazy" width="36" height="36" decoding="async" src={angryFace} />
                        <div class="inset-0"></div>
                    </div>
                </div>
                <div class="cursor-pointer">
                    <div class="relative">
                        <img alt="emoji" loading="lazy" width="36" height="36" decoding="async" src={shocked} />
                        <div class="inset-0"></div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default EmojiDrawer
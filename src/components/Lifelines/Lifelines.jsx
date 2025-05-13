import React from 'react'

const Lifelines = ({ lifelineId, label, icon, usedLifelines, activateLifeline }) => {
    const isUsed = usedLifelines.includes(lifelineId);
    return (
        <div className="flex justify-center animate__animated">
            <div className="max-w-60" onClick={() => !isUsed && activateLifeline(lifelineId)}>
                <div
                    className={`border rounded-full py-8 px-4 h-56 w-56 flex justify-center items-center cursor-pointer
                    ${isUsed ? "bg-CC7C7C7 border-CC7C7C7" : "border-CFFCC5B lifeline-icon-box"}`}
                >
                    {
                        isUsed ? (
                            <div class="border rounded-full py-8 px-4 h-56 w-56 flex justify-center items-center cursor-pointer bg-CC7C7C7 border-CC7C7C7"><svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.08481 7.88735L2.32011 3.97777L0 6.38716L4.92476 11.5014C5.23256 11.8207 5.64979 12 6.08481 12C6.51984 12 6.93707 11.8207 7.24487 11.5014L16 2.40939L13.6799 0L6.08481 7.88735Z" fill="white"></path></svg></div>
                        ) :

                            (<div className="lifeline-icon">
                                {icon}
                            </div>)
                    }
                </div>
                <p className="text-CB36916 dark:text-CFFFAF0 text-center mt-8 font-bold text-12">
                    {label}
                </p>
            </div>
        </div>
    )
}

export default Lifelines
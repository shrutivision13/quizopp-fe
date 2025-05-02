import React, { useState } from 'react';
import PrimaryButton from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';

const topics = [
    {
        title: 'India',
        imgSrc: 'https://static.quizzop.com/newton/assets/category/india-new.png'
    },
    {
        title: 'Bollywood',
        imgSrc: 'https://static.quizzop.com/newton/assets/category/bollywood.png'
    },
    {
        title: 'IPL',
        imgSrc: 'https://static.quizzop.com/newton/assets/category/ipl.png'
    },
    {
        title: 'Hindi English',
        imgSrc: 'https://static.quizzop.com/newton/assets/category/hindi_english.png'
    },
    {
        title: 'SSC',
        imgSrc: 'https://static.quizzop.com/newton/assets/category/ssc.png'
    },
    {
        title: 'Brain Teasers',
        imgSrc: 'https://static.quizzop.com/newton/assets/category/brain_teasers.png'
    },
    {
        title: 'Quick Maths',
        imgSrc: 'https://static.quizzop.com/newton/assets/category/quick_maths.png'
    },
    {
        title: 'General Knowledge',
        imgSrc: 'https://static.quizzop.com/newton/assets/category/general_knowledge.png'
    },
    {
        title: 'Geography',
        imgSrc: 'https://static.quizzop.com/newton/assets/category/geography.png'
    },
    {
        title: 'Logo Quiz',
        imgSrc: 'https://static.quizzop.com/newton/assets/category/logo_quiz.png'
    }
];

const InitialPage = () => {

    const [selectedTopics, setSelectedTopics] = useState([]);
    const navigate = useNavigate();

    const handleSelect = (topicTitle) => {
        setSelectedTopics((prevSelected) => {
            if (prevSelected.includes(topicTitle)) {
                return prevSelected.filter((title) => title !== topicTitle);
            } else {
                return [...prevSelected, topicTitle];
            }
        });
    };

    const handleProceed = () => {
        if (selectedTopics.length > 0) {
            navigate('/start-quiz')
        } else {
            alert('Please select at least one topic to proceed.');
        }
    }

    return (
        <>
            <div className="mb-28 mt-16">
                <p className="font-medium text-16 text-center text-CFAFAF9" data-testid="get-started-text">
                    Choose some topics you might like
                </p>
            </div>
            <div className="flex flex-col justify-between flex-1 hide-scroll-bar">
                <div className="pb-48 flex-grow">
                    <div className="mx-auto flex flex-wrap px-20">
                        {topics && topics?.map((topic, index) => {
                            const isSelected = selectedTopics?.includes(topic?.title);
                            return (
                                <div key={index} className="last:ml-0 mr-10 mb-10">
                                    <button
                                        onClick={() => handleSelect(topic?.title)}
                                        className="whitespace-nowrap text-18 font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer relative justify-center items-center flex border-1 border-C404380 bg-C20213F h-40 px-0 rounded-[99px]"
                                        style={{
                                            borderColor: isSelected ? '#fedc34' : '',
                                        }}
                                    >
                                        <div className="flex justify-center pl-8 w-auto">
                                            <img
                                                alt={topic?.title}
                                                loading="lazy"
                                                width="38"
                                                height="38"
                                                decoding="async"
                                                className="h-27 w-38"
                                                style={{ color: 'transparent' }}
                                                src={topic?.imgSrc}
                                            />
                                        </div>
                                        <div className="z-10 w-full flex justify-center bottom-0 relative pr-12">
                                            <p className="text-14 dark:text-CFFFFFF leading-16 font-semibold">{topic?.title}</p>
                                        </div>
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="border-y-1 py-15 px-20 border-y-C8789C3 bg-C191A32 z-50 sticky bottom-0 w-full">
                    <div role="button" tabIndex={0}>
                        <PrimaryButton
                            text={selectedTopics.length > 0 ? 'Proceed' : 'Select At least 1 Topic'}
                            disabled={selectedTopics.length === 0}
                            shine={selectedTopics.length > 0}
                            onClick={handleProceed}
                        />

                    </div>
                </div>
            </div>
        </>

    );
};

export default InitialPage;

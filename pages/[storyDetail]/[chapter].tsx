import React, { useCallback, useState } from 'react';
import Line from '@/components/Line';
import { Helmet } from 'react-helmet-async';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';

const formatContent = (content: string) => {
  return content && content.replace(/\./g, '.<br /><br />');
};

const ChapterDetailScreen = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const data = JSON.parse(localStorage.getItem('lastClickedChapterData') as string);

  const handleMoveTopPage = useCallback(() => {
    document.getElementById('scroll-to-top')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between" id="scroll-to-top">
      <Helmet>
        <title>{`${data.storyData.title} - Chương ${data.chapter}`}</title>
        <meta name="description" content={data.storyData.title} />
        <meta name="keywords" content="" />
        <meta name="author" content={data.storyData.author} />
        <meta property="og:title" content={data.storyData.title} />
        <meta property="og:description" content={data.storyData.title} />
        <meta property="og:image" content={data.storyData.title} />
        <meta property="og:url" content="WebTruyen" />
        <meta name="twitter:card" content={`${data.storyData.title}`} />
        <meta name="twitter:title" content={data.storyData.title} />
        <meta name="twitter:description" content={data.storyData.title} />
        <meta name="twitter:image" content={data.storyData.title} />
      </Helmet>
      <div className="mt-[150px] mb-40 px-16">
        <div className="flex justify-center items-center">
          <h1 className="text-center font-bold text-[40px]">Chương: {Number(data.chapter)}</h1>
        </div>
        <div className="my-8">
          <Line />
        </div>
        {(data.stories as string[])[data.chapter as any] != null ? (
          <p
            className="tracking-wider leading-loose text-2xl text-justify min-h-screen"
            dangerouslySetInnerHTML={{
              __html: formatContent((data.stories as string[])[data.chapter as any]),
            }}
          />
        ) : (
          <p className="tracking-wider leading-loose text-2xl min-h-screen pt-40 text-center">
            Chương này chưa có, vui lòng thử lại chương khác!!!
          </p>
        )}
      </div>
      <Sidebar
        storySlug={data.storyData.storySlug}
        totalChapter={data.totalChapter}
        setShowSidebar={setShowSidebar}
        showSidebar={showSidebar}
      />
      {!showSidebar && (
        <Button className="fixed right-10 bottom-10 z-50 py-6" onClick={handleMoveTopPage}>
          <img
            src="/images/right-arrow-icon.png"
            className="w-10 h-10 -rotate-90"
            alt="Icon scroll to the top of the page"
          />
        </Button>
      )}
    </div>
  );
};

export default ChapterDetailScreen;

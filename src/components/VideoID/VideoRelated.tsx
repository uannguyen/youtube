import { PoweroffOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Video from "components/Home/Video";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppDispatch, useAppSelector } from "stores/toolkit/hooks";
import { searchVideos } from "stores/toolkit/Slice/videoSearchSlice";

const VideoRelated = () => {
  const dispatch = useAppDispatch();
  const {
    videos: { items = [], pageToken }
  } = useAppSelector((state) => state.videoSearch);
  const { access_token } = useAppSelector((state) => state.auth);

  const fetchMoreData = () => {
    setTimeout(() => {
      dispatch(searchVideos({ pageToken }));
    }, 1500);
  };
  return (
    <>
      {access_token && (
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<Button type="primary" icon={<PoweroffOutlined />} loading />}
          className="related-video-load"
        >
          {items.map((item, index) => {
            return (
              <div key={index}>
                <Video item={item} videoId={item?.id?.videoId} />
              </div>
            );
          })}
        </InfiniteScroll>
      )}
    </>
  );
};
export default VideoRelated;

import { Skeleton } from 'antd'

const SkeletonWrapper = (props) => {
  const { type, rows = 3, className = '' } = props
  const RenderSkeleton = () => {
    switch (type) {
      case 'image': return <Skeleton.Image className={className} style={{ width: '100%', height: 160 }} />
      case 'avatar': return <Skeleton.Avatar  shape='circle' size='default' />
      default: return <Skeleton className={className} active paragraph={{ rows }} />
    }
  }

  return (
    <>
    {RenderSkeleton()}
    </>
  )
}


const SkeletonVideo = () => {
  return (
    <>
     <div className='card-image'>
       <SkeletonWrapper className='image-skeleton' type='image' /> :
      </div>
      <div className='card-detail'>
       <SkeletonWrapper type='avatar' className='card-detail-left' rows={1} />
       <SkeletonWrapper className='card-detail-right-skeleton' rows={1} />
      </div>
    </>
  )
}

export default SkeletonVideo
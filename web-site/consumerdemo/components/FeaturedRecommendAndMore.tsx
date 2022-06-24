// 精选推荐和更多
const FeaturedRecommendAndMore = () => {
  return(
    <div className='grid items-center grid-cols-6 mt-3'>
      <div className='col-span-5 text-sm font-bold text-gray-900'>
        <svg className="inline w-5 h-5 ml-1 text-primary-600" width="24" height="24" viewBox="0 0 24 24" strokeWidth="4" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="12" y1="4" x2="12" y2="19" /></svg>
        <div className='inline'>精选推荐</div>
      </div>
      <div className='flex mb-1 mr-3 text-xs text-gray-400 justify-self-end'>
        <a href="">
          <div>
            更多
            <svg className="inline w-3 h-3 mb-1 text-gray-400" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <polyline points="9 6 15 12 9 18" /></svg>
          </div>
        </a>
      </div>
    </div>
  )
}

export default FeaturedRecommendAndMore
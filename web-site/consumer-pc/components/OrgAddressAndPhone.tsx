import { FC } from 'react'
interface orgProps {
  eduAddress?: string,
  eduContactPhone?: string
}
// 教育机构地址和电话组件
const OrgAddressAndPhone: FC<orgProps> = (props) => {
  return (<>
    <div className='flex pt-1 text-xs'>
      <div className='text-gray-500'>地址：</div>
      <div>{props.eduAddress}</div>
    </div>
    <div className='flex pt-1 text-xs'>
      <div className='text-gray-500'>电话：</div>
      <div>{props.eduContactPhone}</div>
    </div>
  </>
  )
}
export default OrgAddressAndPhone
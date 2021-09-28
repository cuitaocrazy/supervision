import Button from "../components/Button"
import type { NextPage } from 'next'

const Test: NextPage = () => {
  return <div className="container mx-auto text-white bg-red-500">
    <Button text="test" />
  </div>
}

export default Test
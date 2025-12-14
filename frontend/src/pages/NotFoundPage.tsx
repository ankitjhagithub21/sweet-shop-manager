import { Link } from "react-router-dom"


const NotFoundPage = () => {
  return (
    <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content text-center">
    <div className="flex flex-col gap-10">
      <h1 className="text-5xl font-bold">Oops, Page Not found.</h1>
      
      <Link to={"/"} className="btn btn-secondary w-fit mx-auto">Back to Home</Link>
    </div>
  </div>
</div>
  )
}

export default NotFoundPage
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex h-screen w-full items-center justify-center bg-[#1B4242]'>
      {children}
    </div>
  )
}

export default AuthLayout

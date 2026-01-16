import { Sparkles, Code, Zap, Github } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-linear-to-r from-[rgb(0,0,0)] to-[rgb(34,32,32)] text-white py-8 mt-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-2 left-10 w-20 h-20 bg-[#ffffff] rounded-full animate-bounce"></div>
        <div className="absolute bottom-2 right-10 w-16 h-16 bg-purple-500 rounded-full animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="text-center space-y-3 md:flex md:justify-around">
          <div>
            <div className="flex items-center justify-center gap-2 text-xl font-bold">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                QR Builder
              </span>
              <Sparkles className="w-5 h-5 text-yellow-400" />
            </div>
            <p className="text-sm text-slate-400 mt-4">
              |  Built with ❤️ • Feel free to fork & customize! 💜 |
            </p>
          </div>

          <div className='sm:flex sm:flex-col sm:gap-3 hidden'>
            <div className="flex items-center justify-center gap-3 pt-2">
              <a
                href="https://github.com/AbhiAditya02/QR_Generator"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors duration-200"
              >
                <Github className="w-4 h-4" />
                <span className="text-sm">View on GitHub</span>
              </a>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
              <Code className="w-4 h-4" />
              <span>Built with React</span>
              <Zap className="w-4 h-4 text-yellow-400" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
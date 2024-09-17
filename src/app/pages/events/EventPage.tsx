// pages/_app.tsx
import Sidebar from '@/app/components/Sidebar';

export default function EventPage({ children }) {
    return (
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          {children}
        </main>
      </div>
    )
  }
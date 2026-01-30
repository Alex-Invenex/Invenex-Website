'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from 'react'
import { cn } from '@/lib/utils'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'

// ===========================================
// Types
// ===========================================

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Toast {
  id: string
  message: string
  type: ToastType
  duration: number
  exiting: boolean
}

interface ToastContextValue {
  toasts: Toast[]
  addToast: (message: string, type?: ToastType, duration?: number) => void
  removeToast: (id: string) => void
  success: (message: string, duration?: number) => void
  error: (message: string, duration?: number) => void
  warning: (message: string, duration?: number) => void
  info: (message: string, duration?: number) => void
}

// ===========================================
// Context
// ===========================================

const ToastContext = createContext<ToastContextValue | null>(null)

// ===========================================
// Provider
// ===========================================

interface ToastProviderProps {
  children: ReactNode
  defaultDuration?: number
  maxToasts?: number
}

export function ToastProvider({
  children,
  defaultDuration = 4000,
  maxToasts = 5,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const idCounter = useRef(0)

  const removeToast = useCallback((id: string) => {
    // Start exit animation
    setToasts(prev =>
      prev.map(toast =>
        toast.id === id ? { ...toast, exiting: true } : toast
      )
    )

    // Remove after animation
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id))
    }, 200)
  }, [])

  const addToast = useCallback(
    (message: string, type: ToastType = 'info', duration = defaultDuration) => {
      const id = `toast-${idCounter.current++}`
      const newToast: Toast = { id, message, type, duration, exiting: false }

      setToasts(prev => {
        const updated = [...prev, newToast]
        // Limit max toasts
        if (updated.length > maxToasts) {
          return updated.slice(-maxToasts)
        }
        return updated
      })

      // Auto-dismiss
      if (duration > 0) {
        setTimeout(() => removeToast(id), duration)
      }
    },
    [defaultDuration, maxToasts, removeToast]
  )

  const success = useCallback(
    (message: string, duration?: number) => addToast(message, 'success', duration),
    [addToast]
  )

  const error = useCallback(
    (message: string, duration?: number) => addToast(message, 'error', duration),
    [addToast]
  )

  const warning = useCallback(
    (message: string, duration?: number) => addToast(message, 'warning', duration),
    [addToast]
  )

  const info = useCallback(
    (message: string, duration?: number) => addToast(message, 'info', duration),
    [addToast]
  )

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, removeToast, success, error, warning, info }}
    >
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  )
}

// ===========================================
// Hook
// ===========================================

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

// ===========================================
// Container Component
// ===========================================

interface ToastContainerProps {
  toasts: Toast[]
  onRemove: (id: string) => void
}

function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  if (toasts.length === 0) return null

  return (
    <div
      className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none"
      role="region"
      aria-label="Notifications"
      aria-live="polite"
    >
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  )
}

// ===========================================
// Toast Item Component
// ===========================================

interface ToastItemProps {
  toast: Toast
  onRemove: (id: string) => void
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
  const { id, message, type, exiting } = toast

  const icons: Record<ToastType, ReactNode> = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
  }

  const colors: Record<ToastType, string> = {
    success: 'bg-success text-white',
    error: 'bg-error text-white',
    warning: 'bg-warning text-black',
    info: 'bg-info text-white',
  }

  return (
    <div
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg pointer-events-auto min-w-[280px] max-w-[400px]',
        colors[type],
        // Use CSS classes that handle reduced motion via @media query
        exiting ? 'animate-toast-exit' : 'animate-toast-enter'
      )}
      role="alert"
      data-testid="toast"
      data-toast-type={type}
    >
      <span className="shrink-0">{icons[type]}</span>
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={() => onRemove(id)}
        className="shrink-0 p-1 rounded hover:bg-white/20 transition-colors"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

// ===========================================
// Standalone Toast (for non-context usage)
// ===========================================

interface StandaloneToastProps {
  message: string
  type?: ToastType
  visible: boolean
  onClose?: () => void
}

export function StandaloneToast({
  message,
  type = 'info',
  visible,
  onClose,
}: StandaloneToastProps) {
  if (!visible) return null

  const icons: Record<ToastType, ReactNode> = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
  }

  const colors: Record<ToastType, string> = {
    success: 'bg-success text-white',
    error: 'bg-error text-white',
    warning: 'bg-warning text-black',
    info: 'bg-info text-white',
  }

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg min-w-[280px] max-w-[400px]',
        colors[type],
        // CSS handles reduced motion via @media query in globals.css
        'animate-toast-enter'
      )}
      role="alert"
      data-testid="toast"
    >
      <span className="shrink-0">{icons[type]}</span>
      <p className="flex-1 text-sm font-medium">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="shrink-0 p-1 rounded hover:bg-white/20 transition-colors"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: 'USD' | 'EGP') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export function formatRelativeTime(date: string | Date) {
  const now = new Date();
  const then = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

  return formatDate(date);
}

export function getDaysRemaining(endDate: string | Date) {
  const now = new Date();
  const end = new Date(endDate);
  const diffInDays = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, diffInDays);
}

export function getDesignerLevelColor(level: 'entry' | 'mid' | 'advanced') {
  switch (level) {
    case 'entry':
      return 'text-blue-600 bg-blue-50 border-blue-200';
    case 'mid':
      return 'text-teal-600 bg-teal-50 border-teal-200';
    case 'advanced':
      return 'text-red-600 bg-red-50 border-red-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
}

export function getStatusColor(status: string) {
  switch (status) {
    case 'active':
    case 'in_progress':
      return 'text-blue-600 bg-blue-50 border-blue-200';
    case 'completed':
    case 'ended':
      return 'text-green-600 bg-green-50 border-green-200';
    case 'cancelled':
    case 'failed':
      return 'text-red-600 bg-red-50 border-red-200';
    case 'draft':
    case 'pending':
      return 'text-gray-600 bg-gray-50 border-gray-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
}

import * as React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false);
    
    const displayFallback = !src || imageError;
    const fallbackText = fallback || alt?.charAt(0)?.toUpperCase() || 'U';

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100',
          className
        )}
        {...props}
      >
        {!displayFallback && (
          <Image
            src={src || ''}
            alt={alt || 'Avatar'}
            width={40}
            height={40}
            className="aspect-square h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        )}
        {displayFallback && (
          <div className="flex h-full w-full items-center justify-center rounded-full bg-primary-600 text-white text-sm font-medium">
            {fallbackText}
          </div>
        )}
      </div>
    );
  }
);
Avatar.displayName = 'Avatar';

export { Avatar };

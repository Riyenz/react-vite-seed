import { Loader2, Search } from 'lucide-react';

import { Input } from '@/components/ui/input';

import { cn } from '@/lib/utils';

interface ISearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isLoading?: boolean;
}

export function SearchInput({
  isLoading,
  className,
  ...props
}: ISearchInputProps) {
  return (
    <div className="relative h-max">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 transform">
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-slate-500" />
        ) : (
          <Search className="h-4 w-4 text-slate-500" />
        )}
      </div>
      <Input className={cn('pl-10', className)} {...props} />
    </div>
  );
}

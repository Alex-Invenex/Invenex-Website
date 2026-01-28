'use client';

import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  accept: string;
  maxSize: number;
  onFileSelect: (file: File | null) => void;
  error?: string;
}

export function FileUpload({ accept, maxSize, onFileSelect, error }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (selectedFile: File) => {
    setFileError(null);

    if (selectedFile.size > maxSize) {
      setFileError(`File too large. Max size is ${maxSize / 1024 / 1024}MB`);
      return;
    }

    const extension = selectedFile.name.split('.').pop()?.toLowerCase();
    const allowedExtensions = accept.split(',').map((e) => e.trim().replace('.', ''));

    if (!extension || !allowedExtensions.includes(extension)) {
      setFileError(`Invalid file type. Allowed: ${accept}`);
      return;
    }

    // Validate MIME type for additional security (defense in depth)
    const allowedMimeTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (!allowedMimeTypes.includes(selectedFile.type)) {
      setFileError(`Invalid file type. Allowed: ${accept}`);
      return;
    }

    setFile(selectedFile);
    onFileSelect(selectedFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    setFileError(null);
    onFileSelect(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div>
      <div
        data-testid="file-upload"
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center transition-colors',
          dragActive ? 'border-foreground bg-foreground/5' : 'border-border',
          (error || fileError) && 'border-error'
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        {file ? (
          <div className="flex items-center justify-between">
            <span className="text-foreground">{file.name}</span>
            <button
              type="button"
              onClick={removeFile}
              className="text-error hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded px-2"
            >
              Remove
            </button>
          </div>
        ) : (
          <>
            <p className="text-foreground-muted mb-2">Drag and drop your file here, or</p>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="text-foreground underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
            >
              browse files
            </button>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
          aria-label="Upload resume file"
          aria-describedby={(error || fileError) ? 'file-upload-error' : undefined}
        />
      </div>
      {(error || fileError) && (
        <p id="file-upload-error" className="mt-2 text-body-sm text-error" role="alert">
          {error || fileError}
        </p>
      )}
    </div>
  );
}

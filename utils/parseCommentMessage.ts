interface DartError {
  testID: string;
  error: string;
}

function isDartError(error: unknown): error is DartError {
  return (
    error !== null &&
    typeof error === 'object' &&
    'testID' in error &&
    'error' in error
  );
}

export function parseCommentMessage(comment: string) {
  try {
    const parsed = JSON.parse(comment);

    if (Array.isArray(parsed)) {
      const message = parsed.map(obj => {
        if (isDartError(obj)) {
          return obj.error
            .replaceAll(' '.repeat(10), '')
            .replaceAll(' '.repeat(12), '')
            .replaceAll('\\n', '\n\n');
        }
        return '';
      });
      return message.join('<hr/>');
    }
    return parsed;
  } catch {
    return comment;
  }
}

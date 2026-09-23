type LoadingListener = (isLoading: boolean, activeRequests: number) => void;

class LoadingService {
  private activeRequests = 0;
  private listeners: Set<LoadingListener> = new Set();

  start() {
    this.activeRequests++;
    this.notify();
  }

  stop() {
    this.activeRequests = Math.max(0, this.activeRequests - 1);
    this.notify();
  }

  reset() {
    this.activeRequests = 0;
    this.notify();
  }

  get isLoading(): boolean {
    return this.activeRequests > 0;
  }

  get count(): number {
    return this.activeRequests;
  }

  subscribe(listener: LoadingListener): () => void {
    this.listeners.add(listener);
    // Immediately inform the new subscriber with current state
    listener(this.isLoading, this.activeRequests);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const loading = this.isLoading;
    const count = this.activeRequests;
    this.listeners.forEach((listener) => {
      try {
        listener(loading, count);
      } catch (err) {
        console.error("Error in loading listener:", err);
      }
    });
  }
}

export const loadingService = new LoadingService();

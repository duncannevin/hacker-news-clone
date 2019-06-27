export type StoryParam = string;

export const topStories = 'topstories' as StoryParam;
export const newStories = 'newstories' as StoryParam;
export const bestStories = 'beststories' as StoryParam;
export const askStories = 'askstories' as StoryParam;
export const showStories = 'showstories' as StoryParam;
export const jobStories = 'jobstories' as StoryParam;
export function validateParam (queryParam: string): boolean {
  return [ topStories, newStories, bestStories, askStories, showStories, jobStories ]
    .includes(queryParam);
}

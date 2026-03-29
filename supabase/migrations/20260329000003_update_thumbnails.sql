UPDATE public.products SET thumbnail_url = '/images/products/' || slug || '.png'
WHERE slug IN (
  '2x5-meditation-easy',
  'create-life-you-want-en',
  'create-life-you-want-de',
  'create-new-identity-en',
  'create-new-identity-de',
  'create-perfect-love-life',
  'energizer',
  'find-your-flow-de',
  'healing-witch-wound',
  'healing-witch-wound-de',
  'heilung-familienkarmas',
  'individual-chakra-balancing',
  'personalized-channeling'
);

UPDATE public.products SET thumbnail_url = '/images/products/2x5-meditation-easy.png'
WHERE slug = '2x5-meditation-easy-de';

UPDATE public.products SET thumbnail_url = '/images/products/energizer.png'
WHERE slug IN ('sonnenmeditation', 'sun-meditation');

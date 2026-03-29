-- Public bucket for product thumbnails uploaded via admin
INSERT INTO storage.buckets (id, name, public)
VALUES ('thumbnails', 'thumbnails', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read
CREATE POLICY "thumbnails_public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'thumbnails');

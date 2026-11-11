from pathlib import Path
from PIL import Image, ImageOps, ImageDraw
files=sorted(Path('tmp/pdfs').glob('signing-copy-*.png'), key=lambda p:int(p.stem.split('-')[-1]))
thumbs=[]
for i,p in enumerate(files,1):
    im=Image.open(p).convert('RGB')
    im.thumbnail((330,467))
    tile=Image.new('RGB',(350,500),'#dbe2ea')
    tile.paste(im,((350-im.width)//2,18))
    ImageDraw.Draw(tile).text((12,480),f'Page {i}',fill='#0f172a')
    thumbs.append(tile)
sheet=Image.new('RGB',(350*3,500*((len(thumbs)+2)//3)),'#aab4c2')
for i,t in enumerate(thumbs): sheet.paste(t,((i%3)*350,(i//3)*500))
sheet.save('tmp/pdfs/contact-sheet.png')

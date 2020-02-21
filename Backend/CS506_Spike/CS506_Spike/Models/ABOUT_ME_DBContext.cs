using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CS506_Spike.Models
{
    public partial class ABOUT_ME_DBContext : DbContext
    {
        public ABOUT_ME_DBContext()
        {
        }

        public ABOUT_ME_DBContext(DbContextOptions<ABOUT_ME_DBContext> options)
            : base(options)
        {

        }

        public virtual DbSet<People> People { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<People>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Description).HasColumnType("text");

                entity.Property(e => e.FavoriteFood).HasColumnType("text");

                entity.Property(e => e.FavoriteMovie).HasColumnType("text");

                entity.Property(e => e.FirstName)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PassWord)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.UserName)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
